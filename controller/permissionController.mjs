import db from "../model/index.mjs"

const Permission = db.permissions

const permissionController = {
    getAllPermissions: async (req, res) => {
        try {
            const permissions = await Permission.findAll()
            if (!permissions) return res.status(404).json({ msg: 'Not found permission' })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: permissions
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    getPermissionById: async (req, res) => {
        try {
            const permission = await Permission.findByPk(req.params.id)
            if (!permission) return res.status(404).json({ msg: 'Not found permission' })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: permission
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },


    createPermission: async (req, res) => {
        try {
            const _permission = await Permission.create({
                permission: req.body.permission
            })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: _permission
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

export default permissionController