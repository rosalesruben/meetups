export class Meetup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: Date;
  organizer: string;
  location: string;
  numberOfAttendees: number;

  constructor(
    title: string,
    subtitle: string,
    description: string,
    date: Date,
    organizer: string,
    location: string,
    id?: string,
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.date = date;
    this.organizer = organizer;
    this.location = location;
    this.numberOfAttendees = 0;
    this.id = id;
  }

  getBoxOfBeers(): number {
    return 9;
  }
}
