import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from './Card';
import { Sidebar } from './Sidebar';
import { ModeToggle } from './Mode-toogle';

import { Button } from './Button';

export function Sharedhome() {
  const { sharelink } = useParams();
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSharedContent() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/share/${sharelink}`);
        setContent(res.data.content);
        setUsername(res.data.username);
      } catch (err) {
        console.error("Failed to fetch shared content", err);
      }
    }

    if (sharelink) {
      fetchSharedContent();
    }
  }, [sharelink]);

  return (
    <div className="light:bg-gray-200 dark:bg-black w-screen h-screen overflow-y-auto top-0 left-0">
      <Sidebar />
      <div className="flex sticky top-0 justify-between">
        <h6 className="text-headingcol pl-86 mt-6 text-2xl font-bold">
          Shared Brain by {username}
        </h6>
        <div className="flex justify-end gap-x-4 mt-6 mr-8">
          <Button text='Signup' size='md' onClick={() => {navigate("/")}} variants='primary' />
          <div className="flex items-center"><ModeToggle /></div>
        </div>
      </div>
      <div className="pl-86 pt-16 flex gap-x-4 flex-wrap space-y-4">
        {content?.map(({ type, title, link, _id }) => (
          <Card key={_id} id={_id} title={title} type={type} link={link} readOnly />
        ))}
      </div>
    </div>
  );
}
