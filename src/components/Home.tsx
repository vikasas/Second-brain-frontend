import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Content } from './Content';
import { Add } from '../icons/Add';
import { Share } from '../icons/Share';
import { Sidebar } from './Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ModeToggle } from './Mode-toogle';
import { Menu } from 'lucide-react';

function Home() {
  const [modal, Setmodal] = useState(false);
  const { content, refresh } = useContent();
  const [filter, setFilter] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    refresh();
  }, [modal, refresh]);

  async function Sharebrain() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        }
      );
      await window.navigator.clipboard.writeText(
        `https://second-brain-frontend-alpha.vercel.app/${response.data.hash}`
      );
      toast.success('URL copied to the clipboard');
    } catch (e) {
      console.log(e);
      toast.error('Failed to fetch URL');
    }
  }

  const contentfilter = content?.filter(({ type }: { type: string }) => {
    if (!filter || filter === '') return true;
    return type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="flex w-screen min-h-screen light:bg-gray-200 dark:bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onFilter={(type: string) => setFilter(type)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <Content open={modal} onclose={() => Setmodal(false)} />

        {/* Top bar */}
        <div className="sticky top-0 z-10 flex flex-col md:flex-col justify-between px-4 md:px-8 py-4 bg-inherit">
          <div className="flex items-center lg:justify-end md:justify-end justify-between pr-4 gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-700 dark:text-white"
            >
              <Menu size={24} />
            </button>
             <Button
              text="Share Brain"
              onClick={Sharebrain}
              variants="secondary"
              size="md"
              starticon={<Share />}
            />
            <Button
              text="Add Content"
              onClick={() => Setmodal(true)}
              variants="primary"
              size="md"
              starticon={<Add />}
            />
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2  md:gap-x-4 items-center justify-start mt-4 md:mt-0">
            <h6 className="text-headingcol lg:mt-0 mt-6 md:mt-2 text-xl md:text-2xl font-bold">
              All Content
            </h6>
          </div>
        </div>

        {/* Content grid */}
        <div className="pt-6 px-4 md:px-8 flex  justify-center flex-wrap  lg:justify-start md:justify-start gap-4 pb-10">
          {contentfilter?.map(({ type, title, link, _id }) => (
            <Card key={_id} id={_id} title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
