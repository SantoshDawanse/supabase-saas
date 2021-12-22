import _ from "lodash";
import { supabase } from "../utils/supabase";
import Link from "next/link";


export default function Home(data) {
  const { lessons } = data;
  console.log(lessons);
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {
        _.map(lessons, lesson => { 
          return <Link key={lesson.id} href={`/${lesson.id}`}>
            <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">{lesson.title}</a>
          </Link>
        })
      }
    </div>
  )
}

export const getStaticProps = async () => {

  const { data: lessons } = await supabase.from('lesson').select('*');
  return {
    props: {
      lessons
    }
  }
}
