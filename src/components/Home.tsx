
import { useEffect, useState } from 'react'
// import './App.css'
import { Button } from './Button'
import { Card } from './Card'
import { Content } from './Content'
import { Add } from '../icons/Add'
import { Share } from '../icons/Share'
import { Sidebar } from './Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ModeToggle } from './Mode-toogle'



function Home() {

  const [modal , Setmodal] = useState(false);
  const {content , refresh} = useContent();
  const [filter,setFilter] = useState<string | null>(null);

  useEffect(() => {
    refresh()
  }, [modal , refresh])


    async function Sharebrain(){
      try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/share`,{
            share : true
      }, {
          headers :{
            "Authorization" : localStorage.getItem("token")
          }
      })
       await window.navigator.clipboard.writeText("http://localhost:5173/"+ response.data.hash)
      toast.success("url copied to the clipboard");
      }catch(e){
        console.log(e);
        toast.error("failed to fetch url")
      }

    }

    const contentfilter = content?.filter(({ type }) => {
    if (!filter || filter === '') return true;
    return type.toLowerCase() === filter.toLowerCase();
  });
  
  return (
    <div className='light:bg-gray-200 dark:bg-black w-screen h-screen overflow-y-auto top-0 left-0'>
      <Sidebar onFilter={(type: string) => setFilter(type)} />
      <div>
         <Content open={modal} onclose={() => {
            Setmodal(false)
         }} />
      </div>
      <div className='flex sticky top-0  justify-between'>
      <div>
          <h6 className='text-headingcol pl-86 mt-6 text-2xl font-bold'>All Content</h6>
      </div>
      <div className="flex justify-end gap-x-4  mt-6 mr-8 ">
          <Button text='Share Brain' onClick={Sharebrain} variants='secondary' size='md'  starticon = {<Share/>} />
          <Button text='Add Content'  variants='primary' size='md'  onClick={() => {Setmodal(true)}} starticon={<Add/>}/>
          <div className='flex items-center'><ModeToggle/></div>
      </div>
      </div>
     
      <div className="pl-86 pt-16 flex gap-x-4 flex-wrap space-y-4 ">
        {/* {JSON.stringify(content)} */}
        {contentfilter?.map(({type , title , link , _id}) => <Card key={_id}  id={_id} title={title} type={type}  link={link} />)}
      </div>
    </div>
  )
}

export default Home
