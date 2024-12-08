import { useNavigate } from 'react-router-dom';


const useScrollToTopNavigate = () => {
    const navigate = useNavigate();

    const scrollToTopNavigate = (to, options) => {
        navigate(to, options);
        window.scrollTo(0, 0);
    };

    return scrollToTopNavigate;
};

export default useScrollToTopNavigate;