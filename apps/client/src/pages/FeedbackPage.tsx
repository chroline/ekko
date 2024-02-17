import ErrorList from '../components/ErrorList.tsx';
import { Button } from '@material-tailwind/react';

function FeedbackPage() {
  return (
    <div className={"text-white min-h-[100vh] bg-gradient-to-tr from-purple-300 to-purple-500 p-12"}>
        <div>
            <h1 className={"text-3xl font-bold mb-6"}>Feedback</h1>
            <ErrorList/>
        </div>

        <Button 
            variant="gradient" 
            size="md" 
            color="purple" 
            className={"rounded-full mt-6"} 
            ripple={false}
            placeholder=""
        >
            HOME
        </Button>
    </div>
  );
}

export default FeedbackPage;
