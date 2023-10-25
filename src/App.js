import React, { useState, useEffect } from "react";
//import { Calendar, momentLocalizer } from "react-big-calendar";
import Calendar from "./Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import moment from "moment";
import { Octokit } from "octokit";

//const localizer = momentLocalizer(moment);

function App() {
  const [allEvents, setAllEvents] = useState();
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;
  const octokit = new Octokit({
    auth: `token ${githubToken}`,
  });
  function removeTime(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  let list = [];
  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);

  useEffect(() => {
    async function getRest() {
      const result = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: "madzida",
          repo: "calendar",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      for (let i = 0; i < result.data.length; i++) {
        list[i] = {
          author: result.data[i].commit.author.name,
          email: result.data[i].commit.author.email,
          title: result.data[i].commit.message,
          start: removeTime(new Date(result.data[i].commit.committer.date)),
          end: removeTime(new Date(result.data[i].commit.committer.date)),
        };
      }
      setAllEvents(list);
    }
    getRest();
  }, []);

  return (
    <div className="App">
      <Calendar event={allEvents} />
    </div>
  );
}

export default App;
