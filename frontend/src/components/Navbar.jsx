import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const solutions = [
  {
    name: 'Map 1',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/map1',
    icon: ChartBarIcon,
  },
  {
    name: 'Map 2',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '/map2',
    icon: CursorArrowRaysIcon,
  },
  { name: 'Map 3', description: "Your customers' data will be safe and secure.", href: '/map3', icon: ShieldCheckIcon },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
  {
    name: 'YouTube Channel',
    description: 'Check out our YouTube channel for additional content.',
    href: 'https://www.youtube.com/@sombrerocult7304',
    target: '_blank',
    rel: 'noreferrer',
    icon: LifebuoyIcon,
  },
  {
    name: 'Mechanics Guide',
    description: 'Learn how to control your movement and maximize your potential.',
    href: 'https://www.youtube.com/watch?v=_Xaj4RnX74s',
    target: '_blank',
    rel: 'noreferrer',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <Popover className="relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-6 lg:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a
              href="#"
              className="hero text-4xl text-white m-auto"
              style={{ position: 'relative', fontFamily: 'Playfair Display' }}
            >
              PG.
            </a>
          </div>
          <div className="-my-2 -mr-2 lg:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 lg:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-white' : 'text-white',
                      'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                  >
                    <span>Solutions</span>
                    <ChevronDownIcon
                      className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {solutions.map((item) => (
                            <a key={item.name} href={item.href} className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                              <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <a href="/master" className="text-base font-medium text-white hover:text-gray-300">
              Master Guide
            </a>
            <a href="/legend" className="text-base font-medium text-white hover:text-gray-300">
              Legend Guide
            </a>

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-white' : 'text-white',
                      'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a key={item.name} href={item.href} className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                              <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden items-center justify-end lg:flex lg:flex-1 lg:w-0">
            {user && (
              <div>
                <button
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  onClick={handleClick}
                >
                  Sign Out
                </button>
              </div>
            )}
            {!user && (
              <div>
                <a href="/login" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-300">
                  Sign in
                </a>

                <a
                  href="/signup"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </a>
              </div>
            )}
            {user && user.role === 'admin' && (
              <div>
                <a
                  href="/add-data"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 lg:ml-3 md:ml-3  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600"
                >
                  Admin Panel
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden z-10">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <a
                    href="#"
                    className="hero text-4xl text-black m-auto"
                    style={{ position: 'relative', fontFamily: 'Playfair Display' }}
                  >
                    PG.
                  </a>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a key={item.name} href={item.href} className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                      <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Pricing
                </a>

                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>
                {resources.map((item) => (
                  <a key={item.name} href={item.href} className="text-base font-medium text-gray-900 hover:text-gray-700">
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                {user && (
                  <div>
                    <button
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      onClick={handleClick}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
                {!user && (
                  <div>
                    <a
                      href="/signup"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Sign up
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?
                      <a href="/login" className="text-indigo-600 hover:text-indigo-500">
                        &nbsp;Sign in
                      </a>
                    </p>
                  </div>
                )}
                {user && user.role === 'admin' && (
                  <div>
                    <a
                      href="/add-data"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 mt-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
                    >
                      Admin Panel
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default NavBar
