import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FeaturedVideoSharp } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius:4
};

const fetures=[
    " Prioritized rankings in conversations and search ",
     " Prioritized rankings in conversations and search ",
     " Prioritized rankings in conversations and search ",
     " Prioritized rankings in conversations and search "
]

export default function SubscriptionModal({handleClose,open}) {
   

    const [plan, setPlan] = React.useState("Anunally");

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className="flex items-center space-x-3">
                        <IconButton onClick={handleClose} arial-label="delete">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="flex justify-center py-10">
                        <div className=" w-[80%] space-y-10">
                            <div className="p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg">
                                <h1 className='text-xl pr-5'>Blue subscribers with a verified phone number will get a blue check once approved </h1>
                                <img className='w-30 h-24' src="data:image/jpeg;base64,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" alt="" />


                            </div>
                            <div className="flex justify-between border rounded-full px-5 py-3 border
                            border-gray-500">
                                <div>
                                    <span
                                        onClick={() => setPlan("Anunally")}
                                        className={`${plan === "monthly" ? "text-black" : "text-gray-400"}
                            cursor-pointer`}>Anunally</span>
                                    <span
                                        className='text-green-500 text-sm ml-5'
                                    >SAVE 12%</span>
                                </div>
                                <p
                                    onClick={() => setPlan("monthly")}
                                    className={`${plan === "monthly" ? "text-black" : "text-gray-400"}
                            cursor-pointer`}>
                                    Monthly
                                </p>
                            </div>
                            <div className="space-y-3">

                                {
                                    fetures.map((item) =>

                                        <div className="flex items-center space-x-5">
                                            <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                                            <p className="text-xs">
                                               {item}
                                                </p>
                                        </div>
                                    )}
                            </div>
                            <div className="cursor-pointer flex justify-center bg-gray-900 text-white
                            rounded-full px-5 py-3">
                                <span className="line-through italic">$ 7,800.00</span>
                                <span className='px-5'>$6800/years</span>
                            </div>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
