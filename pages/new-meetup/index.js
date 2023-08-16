import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import Head from 'next/head';

function newMeetupForm(){
    const router=useRouter();
    async function addMeetupHandler(enteredMeetupData){
       const result=await fetch('/api/new-meetup',{
        method:'POST',
        body:JSON.stringify(enteredMeetupData),
        headers:{
            'Content-Type':'application/json'
        }
       });
       const data=await result.json();
       console.log(data);
       router.push('/');
    }
    return (
        <Fragment>
        <Head>
        <title>Add new Meetup</title>
        <meta
          name="description"
          content="Adding the new important meetups!"
        />
      </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
        );
}
export default newMeetupForm;