export default function MainCard(): JSX.Element {
  return (
    <main className="mt-5">
      <section className="rounded bg-gray-800 w-3/4 container mx-auto grid grid-cols-7 grid-rows-9">
        <section className="bg-gray-900 col-span-2 row-start-1 row-span-full">
          <section className="pt-2 px-5">
            <input
              className="my-5 w-full md:p-2 p-1 bg-gray-700 text-white focus:outline-none focus:ring focus:ring-gray-800 rounded-sm"
              placeholder="Search..."
            />
          </section>
          <section className="divide-y divide-gray-700 overflow-y-hidden hover:overfow-y-auto">
            <div className="p-5 hover:bg-gray-700 cursor-pointer bg-gray-800">
              <div className="mt-1 flex justify-between">
                <h5 className="text-sm text-white font-semibold">
                  Need help with html !
                </h5>
                <p className="text-white text-xs font-extrabold">$12</p>
              </div>
              <p className="text-gray-500 text-xs font-medium truncate mt-2">
                help with html needed, i am rookie developer !
              </p>
            </div>
            <div className="p-5 hover:bg-gray-800 cursor-pointer bg-gray-900">
              <div className="mt-1 flex justify-between">
                <h5 className="text-sm text-white font-semibold">
                  Need help with html !
                </h5>
                <p className="text-white text-xs font-extrabold">$12</p>
              </div>
              <p className="text-gray-500 text-xs font-medium truncate mt-2">
                help with html needed, i am rookie developer !
              </p>
            </div>
            <div className="p-5 hover:bg-gray-800 cursor-pointer bg-gray-900">
              <div className="mt-1 flex justify-between">
                <h5 className="text-sm text-white font-semibold">
                  Need help with html !
                </h5>
                <p className="text-white text-xs font-extrabold">$12</p>
              </div>
              <p className="text-gray-500 text-xs font-medium truncate mt-2">
                help with html needed, i am rookie developer !
              </p>
            </div>
          </section>
        </section>
        <section className="bg-gray-800 col-span-5 row-start-1 row-span-full p-10 pt-5 overflow-y-auto">
          <div className="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="inline"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
            </svg>
            <p className="inline ml-1 text-white">Ralph</p>
          </div>

          <h1 className="text-white text-4xl font-bold">
            Need help with html !
          </h1>
          <p className="mt-4 text-gray-400 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            quos illum, quas tempora a praesentium corrupti sequi nulla ea
            autem, quam alias assumenda. Illo laboriosam hic sed, consequuntur
            laborum delectus deleniti doloribus atque omnis, minus quasi quidem
            temporibus tempora vero eos id nemo optio inventore consectetur
            excepturi mollitia ipsum autem blanditiis? Optio minus distinctio
            ipsam ipsum accusamus, nisi sit tempore nemo dicta at. Sequi et
            laudantium quis animi dicta neque, nesciunt error maiores, delectus
            repudiandae eius molestias perferendis praesentium consequatur iure
            veritatis voluptates! Quam, quos culpa eaque soluta deleniti qui?
            Cum exercitationem accusamus iure eligendi voluptatibus. In harum
            eum ipsum, perferendis minima, quae enim perspiciatis nobis quam vel
            tempora nisi recusandae ex eligendi voluptatibus pariatur obcaecati
            cum ea commodi exercitationem quidem sint hic veritatis. Sed et
            iste, natus excepturi hic error quam, iusto magnam debitis nihil
            vel? Quod dolor maxime velit veritatis dignissimos ipsa aut! Nobis
            sequi dolores error ipsa.
          </p>
          <p className="text-3xl mt-5 text-white font-extrabold text-center">
            $12
          </p>
        </section>
      </section>
    </main>
  );
}
