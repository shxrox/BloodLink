# Digital Blood Department Management System for Hospitals in Sri Lanka

## Overview
The **Digital Blood Department Management System** is designed to digitize the entire workflow of a hospital's blood department. By automating processes from patient registration to blood report delivery, this system enhances efficiency, reduces waiting times, and improves communication between medical professionals. The system integrates with various roles, such as doctors, nurses, and lab technicians, to streamline the patient management process.

## Main Objective / Scope
The main goal is to eliminate manual processes within the hospital's blood department. The system digitizes patient registration, test requests, test results, and overall patient flow. This leads to:
- Improved efficiency
- Reduced waiting times
- Better communication and tracking of patients and their blood test statuses

## Tech Stack
- **Frontend**: React
- **Backend**: Spring Boot (Java + REST API)
- **Database**: MySQL

## Features

### Shared Functions (for Doctor, Nurse, Lab Technician)
- **Login**: Secure login for different user roles.
- **View Upcoming Patients (Queue List)**: View the list of upcoming patients waiting for blood-related services.
- **Search Patients by NIC or Name**: Search for patients using their NIC number or name.
- **View Patient Details**: View detailed information about the patient.
- **Track Patient Status**: Track patient progress (WAITING / IN_PROGRESS / DONE).

### Doctor Functions
- **Call Next Patient**: Call the next patient in the queue.
- **Mark Patient as Done**: Mark the patient as done once their procedure is complete.
- **Request Blood Test**: Request a blood test for the patient.
- **View Blood Test Results**: View the results of the requested blood tests.
- **View Patient Visit History**: View the history of the patient's visits to the blood department.
- **Add Doctor’s Notes**: Optionally, add any notes related to the patient's treatment.

### Nurse Functions
- **Register New Patient**: Register new patients into the system.
- **Issue Queue Number**: Issue a queue number to the patient upon registration.
- **Assist in Patient Flow (Call Next)**: Help manage the flow of patients by calling the next patient.
- **View Assigned Queue**: View the queue assigned to the nurse.

### Lab Technician Functions
- **View Test Requests from Doctors**: View blood test requests made by doctors.
- **Mark Blood Sample as Collected**: Mark the collected blood sample.
- **Enter Blood Test Results**: Enter the results of the blood test.
- **Submit Test Report to System**: Submit the completed test report into the system.
- **View Previous Lab Reports**: View previous lab reports for the patient.
