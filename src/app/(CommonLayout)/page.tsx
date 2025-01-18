import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto py-5 px-2 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
            <div className="col-span-3 bg-secondary/10 border border-secondary/30 rounded-xl px-5 pt-12 pb-5">
              <h4 className="text-2xl">Welcome back!</h4>
              <h4 className="text-3xl font-bold mb-1">Imam Hossain Shadin</h4>
              <p className="text-base">It&apos;s great to see you again!</p>
              {/* <h3 className="text-4xl font-bold">1523</h3> */}
            </div>
            <div className="col-span-3 flex gap-4">
              <Link
                href={"/add-question"}
                className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
              >
                Add Question
              </Link>
              <Link
                href={"/add-course"}
                className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
              >
                Add Course
              </Link>
              <Link
                href={"/add-subject"}
                className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
              >
                Add Subject
              </Link>
              <Link
                href={"/add-topic"}
                className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-xl transition duration-150`}
              >
                Add Topic
              </Link>
            </div>
            <div className="row-span-2 bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 flex flex-col items-center justify-center">
              <h4 className="text-2xl mb-1">Total Questions</h4>
              <h3 className="text-4xl font-bold">1523</h3>
            </div>
            <div className="col-span-2 bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 *:text-center">
              <h4 className="text-2xl mb-1">Total Users</h4>
              <h3 className="text-4xl font-bold">1523</h3>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 *:text-center">
              <h4 className="text-2xl mb-1">Approved Users</h4>
              <h3 className="text-4xl font-bold">1523</h3>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 *:text-center">
              <h4 className="text-2xl mb-1">Pending Users</h4>
              <h3 className="text-4xl font-bold">1523</h3>
            </div>
            <div className="col-span-2 bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 *:text-center">
              <h4 className="text-2xl mb-1">Total Teachers</h4>
              <h3 className="text-4xl font-bold">1523</h3>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-8 *:text-center">
              <h4 className="text-2xl mb-1">Total Copywriters</h4>
              <h3 className="text-4xl font-bold">1523</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
