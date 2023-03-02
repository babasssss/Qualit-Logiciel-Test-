
export default class Booking {
  /**
   * Constructeur
   * @constructor
   *
   * @param {String} idBooking         - Identifiant de la location
   * @param {String} rentDate   - Date de location
   * @param {String} returnDate - Date de retour
   * @param {Book}   book       - Elément loué
   * @param {User}   user       - Utilisateur qui loue l'élément
   */
  constructor(idBooking, rentDate, returnDate, book, user) {
    this.idBooking  = idBooking;
    this.rentDate   = rentDate;
    this.returnDate = returnDate;
    this.book       = book;
    this.user       = user;
  }
}
