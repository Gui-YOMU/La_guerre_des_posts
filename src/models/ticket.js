import mongoose from 'mongoose';
const ticketSchema = new mongoose.Schema({
    titre: String,
    description: String,
    etat: { type: String, default: 'Todo' },
    assigneA: { type: mongoose.Schema.Types.ObjectId, ref: 'Administrateur' }
});
export default mongoose.model('Ticket', ticketSchema);