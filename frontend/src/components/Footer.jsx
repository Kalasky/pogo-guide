import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-400 to-indigo-500">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="text-4xl text-white" style={{ position: 'relative', fontFamily: 'Playfair Display' }}>
                PG.
              </a>
            </div>
            <p className="max-w-xs mt-4 text-sm text-white">If you read this, you're awesome. Have a nice day! </p>
          </div>
          <div className="grid grid-cols-3 gap-8 lg:col-span-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <p className="font-semibold text-white">Guides</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                {/* Add the appropriate href attribute values for each link */}
                <a className="hover:opacity-75" href="/map1">
                  Map 1
                </a>
                <a className="hover:opacity-75" href="/map2">
                  Map 2
                </a>
                <a className="hover:opacity-75" href="/map3">
                  Map 3
                </a>
                <a className="hover:opacity-75" href="/master">
                  Master
                </a>
                <a className="hover:opacity-75" href="/legend">
                  Legend
                </a>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-white">Social</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                {/* Add the appropriate href attribute values for each link */}
                <a className="hover:opacity-75" href="#">
                  Discord
                </a>

                <a className="hover:opacity-75" href="#">
                  Testimonials
                </a>
                <a className="hover:opacity-75" href="#">
                  FAQ
                </a>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-white">Support</p>

              <nav class="flex flex-col mt-4 space-y-2 text-sm text-white">
                <a class="hover:opacity-75" href>
                  Discord
                </a>
                <a class="hover:opacity-75" href>
                  Terms of Service
                </a>
                <a class="hover:opacity-75" href>
                  Licenses
                </a>
                <a class="hover:opacity-75" href>
                  Mentor Program
                </a>
              </nav>
            </div>
          </div>
        </div>
        <p class="mt-8 text-xs text-white">Made by kalasky</p>
      </div>
    </footer>
  )
}

export default Footer
