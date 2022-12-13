
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';

export default function Calculator(){

    const op1 = useRef();
    const op2 = useRef();
    const operator = useRef();
    const [result, setResult] = useState("Result= ");

    const handleFormSubmit = async(e)=>{
      e.preventDefault();

      if(op1?.current.value?.trim()?.length>0 && op2?.current.value?.trim()?.length>0 && operator){

       setResult("Result= ");

      const res = await axios.post("http://localhost:8080/api/v1/doMath", {
        operand1: op1?.current.value?.trim(),
        operand2: op2?.current.value?.trim(),
        operation: operator?.current.value?.trim(),
      });

      if(res.data.calcResponse && res.data.status == true){
      setResult("Result= "+ res.data.calcResponse);
     return ;
      }
     else{
      setResult("Something went wrong!");
      }
     
        return ;
      }else{
        alert("Please Fill Out All Fields");
      }
    }

    return(
        <>
        <div className="page-container">

<div className="sub-cont">


                <div className="main-calc">
    <h1 className="text-white text-center mb-5">Calculator</h1>

    <div className="bg-white calc">

        <form action="" onSubmit={handleFormSubmit} method="POST">
            <div className="inpt-cont mb-4">
                <input type="number" required ref={op1} placeholder="Enter Operand1" className="form-control py-3 shadow-none" />
            </div>

                      <div className="inpt-cont mb-4">
                <select ref={operator} required name="" id="" className='form-select py-3 shadow-none'>
                    <option disabled value="" selected>Select The Operator</option>
                    <option value="+">+ (Plus)</option>
                    <option value="-">- (Minus)</option>
                    <option value="*">* (Multiply)</option>
                    <option value="/">/ (Divide)</option>
                    <option value="**">^ (Power)</option>
                    <option value="log">Log (Log10)</option>
                    <option value="ln">Ln (Log)</option>
                </select>
            </div>

                        <div className="inpt-cont mb-5">
                <input  type="number" required ref={op2} placeholder="Enter Operand2" className="form-control py-3 shadow-none" />
            </div>

            <div className="result-cont mb-5">
                <textarea value={result} disabled name="" id="" rows="2" className='form-control pt-3 pb-0'>

                </textarea>
            </div>

                    <div className="d-flex w-100">
                          <div className="inpt-cont mb-4 me-4 w-50">
             <button type='submit' className='btn btn-primary py-3 w-100'>Submit</button>
            </div>

                         <div className="inpt-cont mb-4 w-50">
             <button type='reset' className='btn btn-danger py-3 w-100'>Reset</button>
            </div>
                    </div>
        </form>

    </div>
               
            </div>
</div>
          
        </div>
        </>
    )
}