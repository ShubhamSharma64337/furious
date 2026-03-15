import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [bookingInfo,setBookingInfo] = useState({"name":"","pickup":"","drop":"","driver":"JS","date":"","phone":""})
  const [seatMatrix, setSeatMatrix] = useState({ "front": 1, "left": 1, "center": 1, "right": 1 });
  function updateSeats() {
    let newseats = { "front": seatMatrix.front, "left": seatMatrix.left, "center": seatMatrix.center, "right": seatMatrix.right };
    if (event.target.id == "front") {
      newseats.front ? newseats.front = 0 : newseats.front = 1;
    }
    if (event.target.id == "left") {
      newseats.left ? newseats.left = 0 : newseats.left = 1;
    }
    if (event.target.id == "center") {
      newseats.center ? newseats.center = 0 : newseats.center = 1;
    }
    if (event.target.id == "right") {
      newseats.right ? newseats.right = 0 : newseats.right = 1;
    }
    setSeatMatrix(newseats)
  }
  function updateBookingInfo(){
    let newbookinginfo = {...bookingInfo};
      let propName = event.target.id;
      newbookinginfo[propName] = event.target.value;
    
    setBookingInfo(newbookinginfo);
  }
  async function bookRide() {
    var name = bookingInfo.name;
    var pickup = bookingInfo.pickup;
    var drop = bookingInfo.drop;
    var driver = bookingInfo.driver;
    var phone = bookingInfo.phone;
    var date = bookingInfo.date;
    var seatsString = `${seatMatrix.front?'':'front '}`+`${seatMatrix.left?'':'left '}`+`${seatMatrix.center?'':'center '}`+`${seatMatrix.right?'':'right '}`;
    console.log(seatsString)
    // Check if anything is missing
    // if (!name || !pickup || !drop || selectedSeats.length === 0) {
    //   alert("PLEASE: Fill all fields and select at least one seat.");
    //   return;
    // }

    // var btn = document.getElementById('bookBtn');
    // btn.innerText = "SENDING...";
    // btn.disabled = true;

    try {
      // Post to Google Sheets
        var response = await fetch('https://sheetdb.io/api/v1/s9fmdpx1ku041', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            "Name": name,
            "Pickup": pickup,
            "Drop": drop,
            "Driver": driver,
            "Phone": phone,
            "Date": date,
            "Seat": seatsString
          }]
        })
      });

      if (response.ok) {
        var msg = "New Booking!%0AName: " + name + "%0APickup: " + pickup + "%0ADrop: " + drop + "%0ASeats: " + seatsString;
        window.location.href = "https://wa.me/" + '9103754740' + "?text=" + msg;
      } else {
        throw new Error("SheetDB Error");
      }

    } catch (error) {
      alert("Error: " + error.message);
      btn.innerText = "Confirm Booking";
      btn.disabled = false;
    }
  }

  return (
    <>
      <Navbar />
      <div className="mainpage flex justify-center items-center w-full">
        <div className="card border border-purple-500 mt-10 shadow-lg px-7 py-7 rounded-md  grid grid-cols-1 sm:grid-cols-2 w-2/3  sm:w-1/3 md:w-1/2 ">
          <div className="left col col-span-1">
            <div className='col-span-2'>
              <h1 className='text-lg text-center font-medium text-gray-800'>Book a ride</h1>
            </div>
            <div className="form-input col-span-2 my-2">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-500">Name</label>
              <div className="mt-1">
                <input id='name' value={bookingInfo.name} onChange={updateBookingInfo} className='p-1 outline-none border-3 border-gray-200 focus:border-purple-500 rounded w-full' type='text' placeholder='Enter your name'></input>
              </div>
            </div>
            <div className="form-input col-span-2 my-2">
              <label htmlFor="pickup" className="block text-sm/6 font-medium text-gray-500">Pickup Location</label>
              <div className="mt-1">
                <input id='pickup' value={bookingInfo.pickup} onChange={updateBookingInfo} className='p-1 outline-none border-3 border-gray-200 focus:border-purple-500 rounded w-full' type='text' placeholder='Pickup from'></input>
              </div>
            </div>
            <div className="form-input col-span-2 my-2">
              <label htmlFor="drop" className="block text-sm/6 font-medium text-gray-500">Drop Location</label>
              <div className="mt-1">
                <input id='drop' value={bookingInfo.drop} onChange={updateBookingInfo}  className='p-1 outline-none border-3 border-gray-200 focus:border-purple-500 rounded w-full' type='text' placeholder='Drop to'></input>
              </div>
            </div>
            <div className="form-input col-span-2 my-2">
              <label htmlFor="driver" className="block text-sm/6 font-medium text-gray-500">Choose a Driver</label>
              <div className="mt-1">
                <select id='driver' onChange={updateBookingInfo} value={bookingInfo.driver} className='w-full p-1 outline-none border-3 border-gray-200 focus:border-purple-500 rounded'>
                  <option value={"JS"}>Sh. Jitendra Sharma</option>
                  <option value={"GP"}>Sh. Gajendra Purohit</option>
                </select>
              </div>
            </div>
            <div className="form-input col-span-2 my-2">
              <label htmlFor="date" className="block text-sm/6 font-medium text-gray-500">Date</label>
              <div className="mt-1">
                <input id="date"  value={bookingInfo.date} onChange={updateBookingInfo} type='date' className='w-full p-1 outline-none border-3 border-gray-200 focus:border-purple-500 rounded' />
              </div>
            </div>
            <div className="form-input col-span-2 my-2">
              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-500">Phone</label>
              <div className="mt-1">
                <input id="phone"  value={bookingInfo.phone} onChange={updateBookingInfo}  type='text' placeholder="Mobile No. (10 Digits)" className='w-full p-1 outline-none border-3 border-gray-200 focus:border-purple-500 rounded' />
              </div>
            </div>
            <div className="form-input col-span-2 my-2">
              <button id='submit' onClick={bookRide} className='border-2   border-purple-400 rounded w-full py-2 hover:cursor-pointer text-slate-900 hover:bg-purple-200'>Book Now</button>
            </div>
          </div>
          <div className="right items-center justify-center flex col col-span-1">
            <div className='seat-matrix grid grid-cols-3 gap-1'>
              <button id='front' onClick={updateSeats} className={`seat col col-span-2 border ${seatMatrix.front ? "border-slate-400" : "border-purple-300 bg-purple-300"} rounded py-10 px-5 text-center`}>Front</button>
              <button id='driver' className={`seat col col-span-1 border border-slate-400 bg-slate-200 rounded py-15 px-5`}>Driver</button>
              <button id='left' onClick={updateSeats} className={`seat col col-span-1 border ${seatMatrix.left ? "border-slate-400" : "border-purple-300 bg-purple-300"} rounded py-15 px-5`}>Left</button>
              <button id='center' onClick={updateSeats} className={`seat col col-span-1 border ${seatMatrix.center ? "border-slate-400" : "border-purple-300 bg-purple-300"} rounded py-15 px-5`}>Center</button>
              <button id='right' onClick={updateSeats} className={`seat col col-span-1 border ${seatMatrix.right ? "border-slate-400" : "border-purple-300 bg-purple-300"} rounded py-15 px-5`}>Right</button>
            </div>
          </div>
        </div>
      </div>
    </>

    // <>
    //   <section id="center">
    //     <div className="hero">
    //       <img src={heroImg} className="base" width="170" height="179" alt="" />
    //       <img src={reactLogo} className="framework" alt="React logo" />
    //       <img src={viteLogo} className="vite" alt="Vite logo" />
    //     </div>
    //     <div>
    //       <h1>Get started</h1>
    //       <p>
    //         Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
    //       </p>
    //     </div>
    //     <button
    //       className="counter"
    //       onClick={() => setCount((count) => count + 1)}
    //     >
    //       Count is {count}
    //     </button>
    //   </section>

    //   <div className="ticks"></div>

    //   <section id="next-steps">
    //     <div id="docs">
    //       <svg className="icon" role="presentation" aria-hidden="true">
    //         <use href="/icons.svg#documentation-icon"></use>
    //       </svg>
    //       <h2>Documentation</h2>
    //       <p>Your questions, answered</p>
    //       <ul>
    //         <li>
    //           <a href="https://vite.dev/" target="_blank">
    //             <img className="logo" src={viteLogo} alt="" />
    //             Explore Vite
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://react.dev/" target="_blank">
    //             <img className="button-icon" src={reactLogo} alt="" />
    //             Learn more
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div id="social">
    //       <svg className="icon" role="presentation" aria-hidden="true">
    //         <use href="/icons.svg#social-icon"></use>
    //       </svg>
    //       <h2>Connect with us</h2>
    //       <p>Join the Vite community</p>
    //       <ul>
    //         <li>
    //           <a href="https://github.com/vitejs/vite" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#github-icon"></use>
    //             </svg>
    //             GitHub
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://chat.vite.dev/" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#discord-icon"></use>
    //             </svg>
    //             Discord
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://x.com/vite_js" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#x-icon"></use>
    //             </svg>
    //             X.com
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://bsky.app/profile/vite.dev" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#bluesky-icon"></use>
    //             </svg>
    //             Bluesky
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </section>

    //   <div className="ticks"></div>
    //   <section id="spacer"></section>
    // </>
  )
}

export default App
