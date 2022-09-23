import { Typography, Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useMoralisQuery } from "react-moralis";


const QandAdetail = () => {

    const { data, fetch } = useMoralisQuery("QuestionModal");
    const [questionList, setQuestionList] = useState([]);


    useEffect(() => {
        const Qlist = JSON.parse(JSON.stringify(data));
        if (Qlist) {
            ListQuestions(Qlist)
        }
    }, [data])

    async function ListQuestions(Qlist) {
        var array = [];
        if (Qlist) {
            for (let index = 0; index < Qlist.length; index++) {
                const element = Qlist[index];
                if (element.CID) {

                    await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then(async (response) => {
                        const id = element.objectId;
                        var newData = { ...response.data, id, element }
                        array.push(newData)
                    })
                }
            }
        }
        setQuestionList(array);
    }

    console.log(questionList, 'question list');

    function truncate(str, max, sep) {
        max = max || 15; var len = str.length; if (len > max) { sep = sep || "..."; var seplen = sep.length; if (seplen > max) { return str.substr(len - max) } var n = -0.5 * (max - len - seplen); var center = len / 2; return str.substr(0, center - n) + sep + str.substr(len - center + n); } return str;
    }
    
    return (
        <>
            <Container>
                <Typography className="form-style-2-heading" style={{marginTop:"55px"}}  fontWeight="bold" variant="h4" mt={20} mb={-4}>
                    Recently <span style={{ color: "#151D3B" }}>Asked Questions</span>
                </Typography>

                {questionList && questionList.map((qList) => {
                    return (
                        <Box mt={10}>
                            <Box
                                sx={{ borderBottom: 1, width: 1150, color: "#E5E5E5" }}
                                mb={4}
                                ml={-2}
                            >
                                <Link to={`/question-detail/${qList.id}`} 
                                style={{ textDecoration: "none" }}>
                                    <Typography color="black" style={{textAlign:"start"}}>
                                        <span style={{ fontWeight: "bold" }}>
                                            {" "}
                                            {qList.que}
                                           {" "}
                                        </span>{" "}
                                       
                                        <br></br>
                                        <span style={{ float:"left" }}>Tags: {qList.tags ? (qList.tags.map((q)=>{
                                            return( 
                                                <small>{`• ${q}  `}</small>
                                            )
                                        })):""} </span>

                                        <span style={{ float:"right" }}>
                                            <small>12 Sept 2022 by {qList.walletAddress ? (truncate(qList.walletAddress)):""}
                                            </small>
                                        </span>
                                        <br />
                                         
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    )
                })}


            </Container>
        </>
    );
};

export default QandAdetail;
