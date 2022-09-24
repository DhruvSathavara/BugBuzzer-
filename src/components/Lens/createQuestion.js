
import { Avatar, Button, CircularProgress } from '@mui/material'
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getPublicationByLatest } from '../../LensProtocol/post/explore/explore-publications';
import QuestionModal from './QuestionModal';

const category = ["reactjs", "javascript", "typescript"]


function CreateQuestion() {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const res = await getPublicationByLatest();
        setPost(res.data.explorePublications.items)
        console.log(res, "res");
    }

    const handleNavigate = (path) => {
        navigate(`/questionDetail/${path}`)
    }


    return (
        <div className='container footer-position ' style={{ marginTop: '8%' }}>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex justify-content-between'>
                        <h3>All Questions</h3>
                        <QuestionModal />
                    </div>
                    <Divider component="li" style={{ listStyle: 'none', margin: '10px' }} />
                </div>
                <div className='col-12 mt-5'>
                    {
                        post == undefined && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                    {
                        post?.length == 0 && <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                            <h4>No Questions Available!</h4>
                        </Box>
                    }
                    {
                        post && post.map((e) => {
                            console.log(e,"e");
                            return (
                                <div className='p-3 text-left ' key={e.id}>
                                    <h3 onClick={() => handleNavigate(e.id)} className='text-primary' style={{ cursor: 'pointer' }}>{e?.metadata?.content}</h3>
                                    <p>{e?.metadata?.description}</p>
                                    <div className='d-flex justify-content-start'>

                                        {
                                            category.map((e) => {
                                                return (
                                                    <Button className='m-2 '>{e}</Button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex '>
                                            <p className='m-2'>Votes</p>
                                            <p className='m-2'>Answers</p>
                                        </div>
                                        <div style={{ cursor: 'pointer' }} className="d-flex">
                                            <Avatar alt="" src={e.profile.picture != null ? e?.profile?.picture?.original?.url : "https://www.pinpng.com/pngs/m/615-6154495_avatar-png-icon-business-woman-icon-vector-transparent.png"} />

                                            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                                                <p className=" text-secondary" style={{ padding: '7px 15px' }}>
                                                    {e.profile.handle}
                                                </p>
                                            </Box>
                                        </div>
                                    </div>
                                    <Divider component="li" style={{ listStyle: 'none' }} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion