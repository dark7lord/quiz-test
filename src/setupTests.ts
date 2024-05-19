import '@testing-library/jest-dom';
// for jest
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;