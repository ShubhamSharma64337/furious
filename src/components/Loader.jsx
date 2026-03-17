function Loader(props) {
  return (
    <div className={`fixed ${!(props.loading)?'hidden':''} justify-center items-center flex flex-col left-0 top-0 bg-slate-100 opacity-50 w-full h-full`}>
        <span className={`${!(props.loading)?'hidden':''} w-2 h-2 border-4 border-t-slate-100 border-purple-900 animate-spin rounded-full opacity-100 px-5 py-5`}></span>
        <span className="italic hidden">Developed by ShubhamSharma64337</span>
    </div>
    
  )
}

export default Loader
