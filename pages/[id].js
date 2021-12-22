import _ from "lodash";
import { supabase } from "../utils/supabase";

const LessionDetails = ({ lesson }) => {
  console.log(lesson);
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-8">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p className="">{lesson.description}</p>
    </div>
  );
}

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from('lesson').select('id');
  const paths = _.map(lessons, ({id}) => { 
    return {
      params: {
        id: id.toString()
      }
    }
  })
  
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: {id} }) => {
  const { data: lesson } = await supabase.from('lesson').select('*').eq('id', id).single();

  return {
    props: {
      lesson
    }
  }
}

export default LessionDetails;