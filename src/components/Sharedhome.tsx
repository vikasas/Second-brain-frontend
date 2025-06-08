import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from './Card';
import { Sidebar } from './Sidebar';
import { ModeToggle } from './Mode-toogle';
import { Menu } from 'lucide-react';
import { Button } from './Button';

export function Sharedhome() {
  const { sharelink } = useParams();
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSharedContent() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/share/${sharelink}`
        );
        setContent(res.data.content);
        setUsername(res.data.username);
      } catch (err) {
        console.error('Failed to fetch shared content', err);
      }
    }

    if (sharelink) {
      fetchSharedContent();
    }
  }, [sharelink]);

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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 flex flex-col md:flex-row justify-between px-4 md:px-8 py-4 bg-inherit">
          {/* Left: Title + Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-700 dark:text-white"
            >
              <Menu size={24} />
            </button>
            <h6 className="text-headingcol text-xl md:text-2xl font-bold">
              Shared Brain by {username}
            </h6>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap gap-2 md:gap-x-4 items-center justify-end mt-4 md:mt-0">
            <Button
              text="Sign up"
              onClick={() => navigate('/')}
              variants="primary"
              size="md"
            />
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="pt-6 px-4 md:px-8 flex flex-wrap justify-start gap-4 pb-10">
          {contentfilter?.map(({ type, title, link, _id }) => (
            <Card
              key={_id}
              id={_id}
              title={title}
              type={type}
              link={link}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
}
