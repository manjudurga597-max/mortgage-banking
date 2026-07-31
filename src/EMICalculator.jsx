import { useState } from "react";


function EMICalculator() {


    const[loanAmount,setLoanAmount] = useState("");
    const[intrestRate,setIntrestRate] = useState("");
    const[tenure,setTenure] = useState("");

    const[emi,setEmi] = useState("");
    const[totalPayment,setTotalPayment] = useState("");
    const[totalInterest,setTotalInterest] = useState("");



    const calculateEMI = () => {


        if(!loanAmount || !intrestRate || !tenure){

            alert("Please fill all fields");
            return;

        }


        const P = Number(loanAmount);

        const R = Number(intrestRate) / 12 / 100;

        const N = Number(tenure) * 12;



        const result =

        (P * R * Math.pow(1 + R, N))

        /

        (Math.pow(1 + R, N) - 1);



        setEmi(result.toFixed(2));



        const payment = result * N;

        const interest = payment - P;



        setTotalPayment(payment.toFixed(2));

        setTotalInterest(interest.toFixed(2));


    };




    return(


<div className="min-h-screen bg-gray-100 p-8">


<div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">


<h1 className="text-3xl font-bold text-blue-700 mb-2">

EMI Calculator

</h1>


<p className="text-gray-500 mb-6">

Calculate your monthly loan EMI

</p>




<label className="font-semibold text-gray-700">

Loan Amount

</label>


<input

type="number"

placeholder="Enter Loan Amount"

value={loanAmount}

onChange={(e)=>setLoanAmount(e.target.value)}

className="w-full mt-2 mb-4 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"

/>





<label className="font-semibold text-gray-700">

Interest Rate (%)

</label>


<input

type="number"

placeholder="Enter Interest Rate"

value={intrestRate}

onChange={(e)=>setIntrestRate(e.target.value)}

className="w-full mt-2 mb-4 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"

/>





<label className="font-semibold text-gray-700">

Loan Tenure (Years)

</label>


<input

type="number"

placeholder="Enter Loan Tenure"

value={tenure}

onChange={(e)=>setTenure(e.target.value)}

className="w-full mt-2 mb-6 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"

/>





<button

onClick={calculateEMI}

className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"

>

Calculate EMI

</button>






<div className="mt-8 grid gap-4">



<div className="bg-green-100 p-4 rounded-xl">

<h3 className="text-gray-600 font-semibold">
Monthly EMI
</h3>

<p className="text-2xl font-bold text-green-700">

₹ {emi}

</p>

</div>





<div className="bg-yellow-100 p-4 rounded-xl">

<h3 className="text-gray-600 font-semibold">
Total Interest
</h3>

<p className="text-2xl font-bold text-yellow-700">

₹ {totalInterest}

</p>

</div>





<div className="bg-blue-100 p-4 rounded-xl">

<h3 className="text-gray-600 font-semibold">
Total Payment
</h3>

<p className="text-2xl font-bold text-blue-700">

₹ {totalPayment}

</p>

</div>



</div>




</div>


</div>


    );

}


export default EMICalculator;