import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'ENTREGA CANCELADA',
      template: 'cancelDelivery',
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

export default new CancelDeliveryMail();
