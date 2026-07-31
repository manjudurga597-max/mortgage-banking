import { useLocation } from "react-router-dom";

function CustomerDetails() {

    const location = useLocation();

    const customer = location.state;
    console.log(customer);


    return (

        <div>

            <h1>Customer Details</h1>


            {customer ? (

                <div>

                    <h3>Customer ID : {customer.customerId}</h3>

                    <h3>Name : {customer.name}</h3>

                    <h3>Phone : {customer.phone}</h3>


                </div>

            ) : (

                <h3>No Customer Data Found</h3>

            )}


        </div>

    );

}


export default CustomerDetails;