import '../assets/style/addproduce.css'
import Footer from "./footer"
import Nav from "./nav"
import ProduceForm from './produceForm'

const AddProduce = ()=>{
    return(
        <div className="addproduce">
            <Nav/>
            <ProduceForm/>
            <Footer/>
        </div>
    )
}

export default AddProduce