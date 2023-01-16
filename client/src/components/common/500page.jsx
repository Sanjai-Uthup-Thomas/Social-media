import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage2() {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-500 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span>500
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Oops something went wrong.</p>
			<p className="mt-4 mb-8 dark:text-gray-800"> Try to refresh this page </p>
		</div>
	</div>
</section>
  )
}

export default ErrorPage2