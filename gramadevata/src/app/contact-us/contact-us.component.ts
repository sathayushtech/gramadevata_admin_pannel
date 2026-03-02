import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  sendEmail(form: any) {

    if (!form.name || !form.email || !form.message) {
      alert('Please fill all fields');
      return;
    }

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      to_email: 'mohankishore955@gmail.com, secondmail@gmail.com'
    };

    emailjs.send(
      'service_rvty4cn',        // ✅ your service ID
      'template_u4b2mmt',       // ✅ your template ID
      templateParams,
      '-2A92mBqPPV0ufxms'        // ✅ your public key (VERY IMPORTANT)
    )
    .then((response) => {
      console.log('SUCCESS!', response);
      alert('✅ Message Sent Successfully!');
    })
    .catch((error) => {
      console.error('FAILED...', error);
      alert('❌ Failed to send message');
    });
  }
}