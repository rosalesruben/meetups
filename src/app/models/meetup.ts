export class Meetup {
  id: string;
  title: string;
  description: string;
  aboutMeetup: string;
  date: Date;
  organizer: string;
  location: string;
  attenders: any[];

  constructor(
    title: string,
    description: string,
    aboutMeetup: string,
    date: Date,
    organizer: string,
    location: string,
    id?: string
  ) {
    this.title = title;
    this.description = description;
    this.aboutMeetup = aboutMeetup;
    this.date = date;
    this.organizer = organizer;
    this.location = location;
    this.attenders = [];
    this.id = id;
  }

  getBoxOfBeers(): number {
    return 9;
  }
}
