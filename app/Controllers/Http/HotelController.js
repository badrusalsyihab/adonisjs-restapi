'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Hotel = use('App/Models/Hotel')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with hotels
 */
class HotelController {
  /**
   * Show a list of all hotels.
   * GET hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const result = await Hotel.all();

    const restData = {
      message: 'Hotel has been listed successfully',
      data: result
    }

    return response.status(200).json(restData)
    
  }

  /**
   * Render a form to be used for creating a new hotel.
   * GET hotels/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new hotel.
   * POST hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const req = request.all()
    
    const rules = {
      name: 'required',
      address: 'required'
    }

    const validation = await validate(req, rules)

    // Check if request body validation
    if (validation.fails()) return response.status(400).json({ message: validation.messages()[0].message })

    const hotel = new Hotel()
    hotel.name = req.name
    hotel.address = req.address
    await hotel.save()
    const resData = {
      message: 'Hotel has been created successfully.',
      data: hotel
    }

    return response.status(201).json(resData)

  }

  /**
   * Display a single hotel.
   * GET hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const hotel = await Hotel.find(params.id)
    const resData = {
      message: 'Hotel been fetched successfully.',
      data: hotel
    }

    return response.status(200).json(resData)
    
  }

  /**
   * Render a form to update an existing hotel.
   * GET hotels/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update hotel details.
   * PUT or PATCH hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a hotel with id.
   * DELETE hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = HotelController
