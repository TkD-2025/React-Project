import { useState, useEffect } from "react"
import "./styles.css"

function App(){

  const [jobs,setJobs] = useState([])
  const [savedJobs,setSavedJobs] = useState([])
  const [search,setSearch] = useState("")
  const [view,setView] = useState("all")

  useEffect(()=>{

    async function fetchJobs(){

      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await res.json()

      const jobsData = data.slice(0,12).map(job=>({
        id:job.id,
        title:job.title.charAt(0).toUpperCase()+job.title.slice(1),
        company:"Tech Company",
        location:"India"
      }))

      setJobs(jobsData)

    }

    fetchJobs()

  },[])

  function saveJob(job){
    if(!savedJobs.find(j=>j.id===job.id)){
      setSavedJobs([...savedJobs,job])
    }
  }

  function removeJob(id){
    setSavedJobs(savedJobs.filter(job=>job.id!==id))
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )

  const displayJobs = view==="all" ? filteredJobs : savedJobs

  return(

    <div className="app">

      <header className="hero">

        <h1>Job Listing Portal</h1>
        <p>Find your next opportunity</p>

        <input
          placeholder="Search jobs..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />

        <div className="nav-buttons">

          <button
            className={view==="all" ? "active":""}
            onClick={()=>setView("all")}
          >
            All Jobs
          </button>

          <button
            className={view==="saved" ? "active":""}
            onClick={()=>setView("saved")}
          >
            Saved ({savedJobs.length})
          </button>

        </div>

      </header>

      <main className="job-container">

        {displayJobs.map(job=>(

          <div className="job-card" key={job.id}>

            <div className="job-top">

              <div className="company-logo">
                {job.company.charAt(0)}
              </div>

              <div>
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
              </div>

            </div>

            <div className="job-tags">
              <span>Full Time</span>
              <span>Remote</span>
            </div>

            <div className="job-actions">

              {view==="all" && (
                <button
                  className="save-btn"
                  onClick={()=>saveJob(job)}
                >
                  Save Job
                </button>
              )}

              {view==="saved" && (
                <button
                  className="remove-btn"
                  onClick={()=>removeJob(job.id)}
                >
                  Remove
                </button>
              )}

              <button className="apply-btn">
                Apply
              </button>

            </div>

          </div>

        ))}

      </main>

    </div>

  )

}

export default App