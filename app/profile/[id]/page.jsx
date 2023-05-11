"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
      
            setUserPosts(data); 
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  useEffect(() => {
    const fetchUser = async () => {
    try {
    const response = await fetch(`/api/users/${params?.id}/user`);
    const data = await response.json();

    setUserName(data?.username); 
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
    };

    if (params?.id) fetchUser();
  }, [params.id]);

  return (
    <>
        {  
            !isLoading && 
             (
                <Profile
                name={userName}
                desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
                data={userPosts}
            />
            )
        }
    </>
  );
};

export default UserProfile;