import NavigationBar from 'components/NavigationBar';
import { InterviewWrapper } from './Interview.styles';
const Interview: React.FC = () => {
  return (
    <InterviewWrapper>
      <NavigationBar />
      <div>Interview Panel</div>
    </InterviewWrapper>
  );
};

export default Interview;
