import './ExploreContainer.css';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>Video Container</strong>
      <video width="96%" controls>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/the-lonesome-coder-dev.appspot.com/o/video%2FTest%20Video-1.webm?alt=media&token=a325e9b9-31b4-45b0-9912-8641f93c1a9a"
          type="video/webm"
        />
      </video>
    </div>
  );
};

export default ExploreContainer;
