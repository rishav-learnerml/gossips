import errorimage from '../assets/404.png'

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-400">
      <img src={errorimage} alt="404 page not found!" className='rounded shadow-md'/>
      <div className='my-3 text-xl '>AW Snap :( 404 Not Found!</div>
    </div>
  );
};

export default ErrorPage; 
