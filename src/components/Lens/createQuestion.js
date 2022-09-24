import { Avatar, Button } from '@mui/material'
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { getPublicationByLatest } from '../../LensProtocol/post/explore/explore-publications';
import QuestionModal from './QuestionModal';

const   category= ["reactjs", "javascript", "typescript"]


function CreateQuestion() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const res = await getPublicationByLatest();
        setPost(res.data.explorePublications.items)
        console.log(res, "res");
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
                     post &&  post.map((e) => {
                            return (
                                <div className='p-3 text-left '>
                                    <h3 className=''>{e?.metadata?.content}</h3>
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