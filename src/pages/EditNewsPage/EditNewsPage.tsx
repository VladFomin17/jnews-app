import NewsForm from "../../modules/NewsForm/components/NewsForm.tsx";
import {useParams} from "react-router-dom";

const EditNewsPage = () => {
    const {id} = useParams();

    return (
        <div className='container'>
            <NewsForm type={'edit'} id={Number(id)}/>
        </div>
    );
};

export default EditNewsPage;