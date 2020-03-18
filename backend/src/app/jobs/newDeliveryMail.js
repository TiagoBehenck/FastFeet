import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'NOVA ENTREGA CADASTRADA',
      template: 'newDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,

        product: delivery.product,

        recipient: delivery.recipient.name,
        street: delivery.recipient.street,
        compliment: delivery.recipient.compliment,
        state: delivery.recipient.state,
        city: delivery.recipient.city,
        postal_code: delivery.recipient.postal_code,
      },
    });
  }
}

export default new NewDeliveryMail();
