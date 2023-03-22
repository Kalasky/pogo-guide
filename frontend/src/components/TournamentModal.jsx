import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const TournamentModal = ({ isOpen, onClose, onCreateTournament }) => {
  const [tournament, setTournament] = useState({
    name: '',
    date: '',
    rules: '',
    description: '',
  })

  const handleChange = (event) => {
    setTournament({ ...tournament, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    onCreateTournament(tournament)
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Create a Tournament
              </Dialog.Title>

              <form onSubmit={handleSubmit}>
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
                <textarea
                  name="rules"
                  value={tournament.rules}
                  onChange={handleChange}
                  placeholder="Tournament Rules"
                  className="border border-gray-300 p-2 my-2 w-full"
                  required
                />
                <textarea
                  name="description"
                  value={tournament.description}
                  onChange={handleChange}
                  placeholder="Tournament Description"
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
