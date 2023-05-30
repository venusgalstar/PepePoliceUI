import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function Example(props) {
  return (
    <div className="flex items-center justify-between defaultBackground px-4 py-0 sm:px-6">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-5 py-2 text-gray-400  focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-300 ring-1 ring-inset ring-gray-300  focus:outline-offset-0" */}
            {
              Array(5).fill(0).map((v, index) => {
                return (
                  <a
                    key={index}
                    href="#"
                    aria-current="page"
                    className="relative inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold text-gray-300 focus:z-20 focus:outline-offset-0"
                    style={{ backgroundColor: `${props.currentIndex === index + 1 ? "#662483" : "transparent"}` }}
                    onClick={() => {
                      props.onClick(index + 1)
                    }}
                  >
                    {index + 1}
                  </a>
                )
              })
            }
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
