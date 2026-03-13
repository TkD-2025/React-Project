function JobCard({job,saveJob,removeJob,isSaved,view}){

  return(

    <div className="job-card">

      <h3>{job.title}</h3>

      <p className="company">{job.company}</p>

      <p className="location">{job.location}</p>

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

    </div>

  )
}

export default JobCard