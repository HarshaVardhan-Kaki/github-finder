import spinner from './assets/spinner (1).gif';

const Spinner = () => {
  return (
    <div className="w-100 mt-20">
      <img
        src={spinner}
        alt="loading..."
        width={180}
        className="text-center mx-auto"
      />
    </div>
  );
};

export default Spinner;
