"use client";
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/config/firebase';
import { TbLoader3 } from "react-icons/tb";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ComponentForm = ({ session }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [processing, setProcessing] = useState(false)

    const formValidation = Yup.object({
        name: Yup.string().required("Please enter the component's name"),
        component: Yup.string().required("Please pass in your component")
    })

    const initialValues = {
        name: "",
        component: ""
    }

    return (
        <main className='p-10 max-md:p-3'>
            <h1 className='text-center text-2xl mb-10 text-gray-700'>Fill this form to contribute to our ever growing community</h1>

            <section className='lg:w-1/2 mx-auto'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidation}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            setProcessing(true)
                            const componentData = {
                                ...values,
                                author: session.user.name,
                                img: session.user.image,
                                timestamp: new Date().toLocaleDateString(),
                                userId: session.user.id
                            }
                            // console.log(componentData)
                            const docRef = await addDoc(collection(db, "library"), componentData)
                            // console.log("Document written with ID: ", docRef.id);
                            setProcessing(false)
                            resetForm()
                            handleOpen()
                        } catch (error) {
                            console.error("An error occured", error)
                            alert("Something went wrong! Try again later.")
                        } finally {
                            setProcessing(false)
                        }

                    }}
                >
                    <Form className='space-y-5'>
                        <div className=''>
                            <label htmlFor="" className='text-xs'>Component Name:</label>
                            <Field
                                name="name"
                                className="w-full outline-none border border-gray-300 rounded-md p-2" placeholder="Enter component's name..." />
                            <ErrorMessage name='name' component={"p"} className='text-red-600 text-xs' />
                        </div>
                        <div>
                            <label htmlFor="" className='text-xs'>Code:</label>
                            <Field name="component" as="textarea" rows="10" className="w-full outline-none border border-gray-300 rounded-md p-2" placeholder="Pass in your component..." />
                            <ErrorMessage name='component' component={"p"} className='text-red-600 text-xs' />
                        </div>

                        <Button disabled={processing} variant='outlined' type='submit' className='w-full mt-3'>
                            Add your component
                            {
                                processing ? <TbLoader3 className='animate-spin text-2xl ml-3 text-gray-600' /> : null
                            }
                        </Button>
                    </Form>
                </Formik>
            </section>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sucessful Submission
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Your component has been received and added to our growing collection
                    </Typography>
                </Box>
            </Modal>
        </main>
    )
}

export default ComponentForm