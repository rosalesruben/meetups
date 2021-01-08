export class Meetup {
  id: string;
  title: string;
  description: string;
  aboutMeetup: string;
  date: Date;
  organizer: string;
  location: string;
  attenders: string[];
  registered: string[];

  constructor(
    title: string,
    description: string,
    aboutMeetup: string,
    date: Date,
    organizer: string,
    location: string,
    attenders: string[],
    registered: string[],
    id?: string
  ) {
    this.title = title;
    this.description = description;
    this.aboutMeetup = aboutMeetup;
    this.date = date;
    this.organizer = organizer;
    this.location = location;
    this.attenders = attenders;
    this.registered = registered;
    this.id = id;
  }

  getBoxOfBeers(temperature: number): number {
    let beersPerPerson;
    if (temperature < 20) {
      beersPerPerson = 0.75;
    } else if (temperature >= 20 && temperature <= 24) {
      beersPerPerson = 1;
    } else {
      beersPerPerson = 3;
    }

    return Math.ceil((beersPerPerson * this.attenders.length) / 6);
  }
}
