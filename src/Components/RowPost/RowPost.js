import React ,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import {imgUrl,API_KEY} from '../../Constant/constants'
import axios from '../../axios'
function RowPost(props) {
  const [movies,setMovies] = useState([])
  const  [urlId,setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch(err => {
        console.error('Network error:', err);
      });
  }, [props.url]); // Add props.url to the dependency array
  
const opts = {
  height: '390',
  width: '100%',
  playerVars: {  // Corrected from 'playrVars' to 'playerVars'
    autoplay: 1,
  },
};

  const handleMovie = (id)=>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
      if(Response.data.results.length!==0){
        setUrlId(Response.data.results[0])
      }else{
        console.log('Array empty');
        
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movies.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall?'smallPoster':'poster' } src={`${imgUrl+obj.backdrop_path}`} alt="" />
          )}
         
        
        
        </div>
    { urlId&& <YouTube  opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost