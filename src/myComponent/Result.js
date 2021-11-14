import React from 'react'

export const Result = ({res, i}) => {
    const base64Icon = res.thumbnail
    var err = false
    if(res.error) {
        err = true
    }
    else {
        err = false
    }
    let imgSize ={
        width: '50vh',
        height: '40vh'
    }
    return (
       <>
      
        <div className="row">
        {err ?(res.error) : (<>
        <img style={imgSize} src={'data:image/jpeg;base64,'+ base64Icon} alt="ICON IMG" />
            <h5 name = "title" key={i} className="p-md-3 col-md-8">{res.title}</h5><br/>
            <a href={res.query} type="submit" className="btn btn-primary m-md-3 col-md-3" title="This button download video in 360p">DOWNLOAD</a>
            </>
        )}        
        </div>
        
        </>
    )
}
