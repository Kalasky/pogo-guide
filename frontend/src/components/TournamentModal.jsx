import React, { useState, useRef, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ReactQuill from 'react-quill'
import Quill from 'quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import '../quill.css'

const CustomImage = Quill.import('formats/image')

const Font = Quill.import('formats/font')
Font.whitelist = [
  'Roboto-Mono',
  'Alkatra',
  'Exo',
  'Josefin-Sans',
  'Chakra-Petch',
  'Shadows-Into-Light',
  'Lobster-Two',
  'Kalam',
  'Handlee',
  'Bad-Script',
  'Fira-Code',
  'Press-Start-2P',
]
CustomImage.className = 'custom-image'

const CustomImageUploadButton = () => {
  const button = document.createElement('button')
  button.className = 'ql-image'
  button.innerHTML =
    '<svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <circle class="ql-fill" cx="11" cy="7" r="1"></circle> <circle class="ql-fill" cx="11" cy="2" r="1"></circle> <circle class="ql-fill" cx="6" cy="2" r="1"></circle> <path class="ql-stroke" d="M14.6,10.6l-1.9-1.9a1,1,0,0,0-1.4,0L9.5,11,6.3,7.8a1,1,0,0,0-1.4,0L3.4,9.3a1,1,0,0,0,0,1.4l3.3,3.3a1,1,0,0,0,1.4,0l3.3-3.3a1,1,0,0,0,0-1.4l2.2-2.2a1,1,0,0,1,1.4,0l2.2,2.2a1,1,0,0,1,0,1.4l-3.3,3.3a1,1,0,0,1-1.4,0l-3.3-3.3"></path> </svg>'
  button.addEventListener('click', () => {
    imageHandler()
  })
  return button
}

Quill.register('modules/toolbar/CustomImageUploadButton', CustomImageUploadButton)
Quill.register('modules/imageResize', ImageResize)
Quill.register(Font, true)

const TournamentModal = ({ isOpen, onClose, onCreateTournament }) => {
  const [tournament, setTournament] = useState({
    name: '',
    date: '',
    rules: '',
    description: '',
    coverImage: '',
    prizePool: '',
    maxPlayers: '',
    bracketType: '',
  })
  const [imageUrl, setImageUrl] = useState([])

  const imageHandler = () => {
    console.log('imageHandler')
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      console.log('file', file)

      const formData = new FormData()
      formData.append('image', file)

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }

      const user = JSON.parse(localStorage.getItem('user'))
      const token = user.token

      try {
        const res = await fetch('http://localhost:8000/api/tournaments/upload-image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        if (res.ok) {
          const data = await res.json()
          const img = new Image()
          img.src = data.image
          img.onload = () => {
            const width = img.width
            const height = img.height

            setImageUrl([...imageUrl, { url: data.image, width, height }])

            const range = descriptionQuillRef.current.getEditor().getSelection(true)
            const imgTag = `<img src="${data.image}" width="${width}" height="${height}" class="custom-image" />`
            descriptionQuillRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, imgTag)
          }
        } else {
          console.error('Failed to upload image')
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const coverImageHandler = async (e) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('image', file)

    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    try {
      const res = await fetch('http://localhost:8000/api/tournaments/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setTournament({
          ...tournament,
          coverImage: data.image,
        })
      } else {
        console.error('Failed to upload image')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: Font.whitelist }],
          [{ align: [] }],
          ['image'],
        ],
        handlers: {
          image: function () {
            imageHandler()
          },
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    []
  )

  const descriptionQuillRef = useRef()
  const rulesQuillRef = useRef()

  const handleChange = (event) => {
    setTournament({ ...tournament, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Create the tournament post with the imageUrl array
    await onCreateTournament({ ...tournament, images: imageUrl })
  }

  const formatDateForInput = (date) => {
    const z = (n) => ('0' + n).slice(-2)
    const YYYY = date.getFullYear()
    const MM = z(date.getMonth() + 1)
    const DD = z(date.getDate())
    const hh = z(date.getHours())
    const mm = z(date.getMinutes())

    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 z-0" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full lg:w-[65vw] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Create a Tournament
              </Dialog.Title>

              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  placeholder="Cover Image"
                  onChange={coverImageHandler}
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="name"
                  value={tournament.name}
                  onChange={handleChange}
                  placeholder="Tournament Name"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                />
                <input
                  type="datetime-local"
                  name="date"
                  value={tournament.date}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 my-2 w-full"
                  min={formatDateForInput(new Date())}
                  required
                />
                <ReactQuill
                  value={tournament.description}
                  onChange={(value) => setTournament({ ...tournament, description: value })}
                  placeholder="Tournament Description"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                  modules={modules}
                  theme="snow"
                  ref={descriptionQuillRef}
                />
                <ReactQuill
                  value={tournament.rules}
                  onChange={(value) => setTournament({ ...tournament, rules: value })}
                  placeholder="Tournament Rules"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                  modules={modules}
                  theme="snow"
                  ref={rulesQuillRef}
                />
                <input
                  type="number"
                  name="prizePool"
                  value={tournament.prizePool}
                  onChange={handleChange}
                  placeholder="Prize Pool"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                />
                <input
                  type="number"
                  name="maxPlayers"
                  value={tournament.maxPlayers}
                  onChange={handleChange}
                  placeholder="Max Players"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="bracketType"
                  value={tournament.bracketType}
                  onChange={handleChange}
                  placeholder="Bracket Type"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none mb-4">
                  Create Tournament
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TournamentModal
