import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient,ObjectId} from 'mongodb'
import Head from "next/head";
import { Fragment } from "react";
function meetupDetails(props){
    return(
        <Fragment>
        <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description}/>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
        <MeetupDetail {...props}/>
        </Fragment>
    ) 
    
   
}

export async function getStaticPaths(){
    console.log('getStaticPaths');
    const client=await MongoClient.connect('mongodb+srv://admin-rajesh:1234rk@cluster0.xmf5o.mongodb.net/meetups?retryWrites=true&w=majority')
    const db=client.db();
    const meetupCollection=db.collection('meetups');
    let meetupIds=await meetupCollection.find({},{_id:1}).toArray();
    meetupIds= meetupIds.map(id=>({params:{meetupId:id._id.toString()}}))

    return {
        fallback:false, 
        paths:meetupIds
        
    }
}

export async function getStaticProps(context){
    console.log('getStaticProps');
   
    const meetUpId=context.params.meetupId;
    const client=await MongoClient.connect('mongodb+srv://admin-rajesh:1234rk@cluster0.xmf5o.mongodb.net/meetups?retryWrites=true&w=majority')
    const db=client.db();
    const meetupCollection=db.collection('meetups');
    const meetup=await meetupCollection.findOne({_id:new ObjectId(meetUpId)});
    client.close();
    //fetching...

    return {
        props:{
            img:meetup.image,
            id:meetup._id.toString(),
            title:meetup.title,
            address:meetup.address,
            description:meetup.description,
        },
    
    }
}

export default meetupDetails;