import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findPlotsById, viewPlot } from '../../Store/Plot/Action';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PlotCard from '../HomeSection/PlotCard';
import { Divider } from '@mui/material';

const PlotDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { plot } = useSelector(store => store);

  useEffect(() => {
    if (id) {
      dispatch(findPlotsById(id));
      dispatch(viewPlot(id));
    }
  }, [id, dispatch]);

  // Safely check if plot.plot exists before rendering
  const mainPlot = plot?.plot;
  const replots = mainPlot?.rePlots || [];
  console.log("replots array =>",replots)

  return (
    <>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
        <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>{mainPlot?.user?.fullName}'s Plot Details</h1>
      </section>

      <section>
        {mainPlot ? (
          <PlotCard item={mainPlot} />
        ) : (
          <p className="text-center text-gray-500">Loading plot...</p>
        )}
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>

      <section>
        {replots.length > 0 ? (
          replots.map(item => <PlotCard key={item.id} item={item} />)
        ) : (
          <p className="text-center text-gray-500">No Replot yet.</p>
        )}
      </section>
    </>
  );
};

export default PlotDetails;
