import { Chat, Message, User } from '../models/mongo/index.js'

export const create = async (req, res) => {
	const newChat = new Chat({ members: [req.body.self, req.body.other] })

	const self = await User.findById(req.body.self)
	const other = await User.findById(req.body.other)

	try {
		if (!self.following.includes(other._id) || !other.following.includes(self._id)) {
			return res.status(200).json({ message: 'Must be friends.' })
		}
		
		const oldChat = await Chat.findOne({ members: { $all: [req.body.self, req.body.other] } })

		if (oldChat) return res.status(200).json({ message: 'Chat already exists.' })

		const chat = await newChat.save()
		res.status(200).json(chat)
	} catch (error) { res.status(500).json(error) }
}

export const remove = async (req, res) => {
	try {
		const chat = await Chat.findOne({ members: { $all: [req.body.self, req.body.other] } })

		if (!chat) return res.status(200).json({ message: 'Chat does not exist.' })

		const messages = await Message.find({ chatId: chat._id })

		messages.forEach(async message => await message.delete())

		await chat.remove()
		res.status(200).json({ message: 'Chat removed.' })
	} catch (error) { res.status(500).json(error) }
}

export const of = async (req, res) => {
	try {
		const chat = await Chat.find({ members: { $in: [req.params.id] } })
		res.status(200).json(chat)
	} catch (error) { res.status(500).json(error) }
}

export const find = async (req, res) => {
	try {
		const chat = await Chat.findOne({ members: { $all: [req.params.self, req.params.other] } })
		res.status(200).json(chat)
	} catch (error) { res.status(500).json(error) }
}