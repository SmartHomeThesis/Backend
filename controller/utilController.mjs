import db from "../model/index.mjs"


const User = db.users
const Permission = db.permissions

const utilController = {
    getUserByName: async (req, res) => {
        try {
            const user = await User.findOne({ where: { name: req.params.name } })
            if (!user) return res.json("False")

            res.json("True")
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    getPermissionOfMemberByName: async (req, res) => {
        try {
            const user = await User.findOne({ where: { name: req.params.name }, include: Permission })
            const permission_length = await Permission.count()

            if (user.permissions.length == permission_length)
                return res.json({
                    name: user.name,
                    permission: 'All'
                })

            let listOfPermission = []

            for (let i = 0; i < user.permissions.length; i++) {
                listOfPermission.push(user.permissions[i].permission)
            }

            res.json({
                name: user.name,
                permission: listOfPermission
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}


export default utilController